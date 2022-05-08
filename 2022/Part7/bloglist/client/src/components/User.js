const User = ({ user }) => {
  console.log(user);
  if (!user) return;
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Added blogs</p>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
