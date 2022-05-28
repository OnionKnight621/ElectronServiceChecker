import isReachable from "is-reachable";

async function checkURI(uri: string) {
  const status = await isReachable(uri);

  return status;
}

export default checkURI;
