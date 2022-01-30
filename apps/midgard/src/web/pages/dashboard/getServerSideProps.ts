export default async function getServerSideProps() {
  console.log(process.env);
  return {
    props: {
      appName: process.env.APP_NAME,
    },
  };
}
