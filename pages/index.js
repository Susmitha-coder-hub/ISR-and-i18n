export default function Home() {
  return null
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/en/docs/v1/introduction',
      permanent: false,
    },
  }
}
