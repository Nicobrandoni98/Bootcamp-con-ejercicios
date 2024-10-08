const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message ? "error" : 'agregado'}>
        {message}
      </div>
    )
  }

  export default Notification