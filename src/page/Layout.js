import Header from "../component/Header";

const Layout = (props) => {
  return (
    <main>
      <Header />
      {props.children}
    </main>
  );
};

export default Layout;
