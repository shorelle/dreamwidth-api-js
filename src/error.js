class DreamwidthError extends Error {

  // Readable error response messages
  constructor(err) {
    super(err);
    console.log('req headers:', err.req && err.req._header);
    console.log('res code:', err.res && err.res.statusCode);
    console.log('res body:', err.body);
  }

}

export default DreamwidthError;