import Layout from "./components/Layout";

interface Props {
  children: React.ReactNode;
}

const TACSLayout: React.FC<Props> = ({ children }) => (
  <Layout>{children}</Layout>
);

export default TACSLayout;
