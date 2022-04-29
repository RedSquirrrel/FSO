/// <reference types="cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'Ada Lovelace',
      name: 'Ada King',
      password: 'test',
    };
    const user2 = {
      username: 'Root',
      name: 'test',
      password: 'secret',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('http://localhost:3000/');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('Fails with wrong credentials', function () {
      cy.get('#username').type('Ada Lovelace');
      cy.get('#password').type('wrong');
      cy.get('#login-btn').click();

      cy.contains('Wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });

    it('Succeeds with correct credentials', function () {
      cy.get('#username').type('Ada Lovelace');
      cy.get('#password').type('test');
      cy.get('#login-btn').click();

      cy.contains('Welcome Ada King');
    });
  });

  describe('POST & PUT => When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Ada Lovelace', password: 'test' });
      cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/' });
      cy.createBlog({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      });
    });

    it('A blog can be created', function () {
      cy.contains('Create New Blog').click();
      cy.get('#title').type('Canonical string reduction');
      cy.get('#author').type('Edsger W. Dijkstra');
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html');
      cy.get('#create-btn').click();
      cy.contains('Canonical string reduction');
    });

    it('Users can like a blog', function () {
      cy.contains('React patterns').parent().find('button').click();
      cy.contains('React patterns').parent().find('.like-btn').click();
      cy.contains('React patterns').parent().should('contain', 'Likes: 1');
      cy.wait(500);

      cy.contains('Like').click();
      cy.contains('React patterns').parent().should('contain', 'Likes: 2');
    });
  });

  describe('DELETE => delete a blog', function () {
    beforeEach(function () {
      cy.login({ username: 'Ada Lovelace', password: 'test' });

      cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/' });
      cy.createBlog({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      });
      cy.createBlog({
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      });
    });

    it('User who created a blog can delete it', function () {
      cy.contains('First class tests').contains('View').click();
      cy.contains('Remove').click();
      cy.contains('Successfully removed "First class tests" by "Robert C. Martin"');
      cy.get('.success').should('have.css', 'color', 'rgb(69, 138, 48)');
    });

    it('Other users cannot delete the blog', function () {
      cy.contains('LogOut').click();
      cy.login({ username: 'Root', password: 'secret' });
      cy.contains('Go To Statement Considered Harmful').contains('View').click();
      cy.get('#remove_btn').should('not.exist');
    });

    it('Blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.contains('Go To Statement Considered Harmful').parent().find('button').click();
      cy.contains('Go To Statement Considered Harmful').parent().find('.like-btn').click();
      cy.contains('Go To Statement Considered Harmful').parent().should('contain', 'Likes: 1');
      cy.wait(500);

      cy.contains('Like').click();
      cy.contains('Go To Statement Considered Harmful').parent().should('contain', 'Likes: 2');
      cy.wait(500);

      cy.contains('Like').click();
      cy.contains('Go To Statement Considered Harmful').parent().should('contain', 'Likes: 3');
      cy.wait(500);
      //  ========
      cy.contains('First class tests').parent().find('button').click();
      cy.contains('First class tests').parent().find('.like-btn').click();
      cy.contains('First class tests').parent().should('contain', 'Likes: 1');

      cy.get('.flex').eq(0).should('contain', 'Go To Statement Considered Harmful');
      cy.get('.flex').eq(1).should('contain', 'First class tests');
      cy.get('.flex').eq(2).should('contain', 'React patterns');
    });
  });
});
