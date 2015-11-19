dataUriToFile = function(dataUri, fileName) {
  // https://en.wikipedia.org/wiki/Data_URI_scheme
  // create a pattern to match the data uri
  var patt = /^data:([^\/]+\/[^;]+)?(;charset=([^;]+))?(;base64)?,/i,
    matches = dataUri.match(patt);
  if (matches == null){
    throw new Error("data: uri did not match scheme")
  }
  var
    prefix = matches[0],
    contentType = matches[1],
    // var charset = matches[3]; -- not used.
    isBase64 = matches[4] != null,
    // remove the prefix
    encodedBytes = dataUri.slice(prefix.length),
    // decode the bytes
    decodedBytes = isBase64 ? atob(encodedBytes) : encodedBytes,
    // return the file object
    props = {};
  if (contentType) {
    props.type = contentType;
  }
  return new File([decodedBytes], fileName, props);
}
