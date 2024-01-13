const Footer = () => {
  const footerStyle = {
    color: "black",
    textAlign: "center",
    padding: "20px",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // Other styling as needed
  };

  return (
    <footer style={footerStyle}>
      <div>
        Anecdote app for{" "}
        <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
        <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
          https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
        </a>{" "}
        for the source code.
      </div>
    </footer>
  );
};

export default Footer;
