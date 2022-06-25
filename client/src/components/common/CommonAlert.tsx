import Alert from '@mui/material/Alert';

const CommonAlert = (props) => {
  const {actionType, color, message } = props
  return (
    actionType ? 
    <Alert severity={color} color={color}>
     {message}
  </Alert> : null
  )
}
export default CommonAlert