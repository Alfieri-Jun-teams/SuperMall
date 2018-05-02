const returnClientResponse = (message, success, result) => {
  const data = {
    message: message,
    success: success,
    result: result
  }

  return data
}

export {
  returnClientResponse
}
