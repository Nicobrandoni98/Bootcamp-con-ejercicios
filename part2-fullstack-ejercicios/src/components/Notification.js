const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="agregado">
        {message}
      </div>
    )
  }

  export default Notification