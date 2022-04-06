const Header = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ part }) => (
  <>
    {part.map(p => (
      <p key={p.id}>
        {p.name} {p.exercises}
      </p>
    ))}
  </>
);

const Content = ({ parts }) => (
  <>
    {parts.map(p => (
      <div key={p.id}>
        <Header course={p} />
        <Part key={p.id} part={p.parts} />
        <Total parts={p.parts} />
      </div>
    ))}
  </>
);

const Total = ({ parts }) => {
  const total = parts.reduce((acc, obj) => {
    return acc + obj.exercises;
  }, 0);

  return (
    <div>
      <h4> Total of {total} exercises</h4>
    </div>
  );
};

const Course = ({ course }) => (
  <>
    <Content parts={course} />
  </>
);

export default Course;
