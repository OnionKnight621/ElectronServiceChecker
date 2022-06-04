import isReachable from "is-reachable";

// TODO: replace with normal check
async function checkURI(uri: string): Promise<boolean> {
  const status = await isReachable(uri);

  return status;
}

export default checkURI;
