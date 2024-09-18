import { InputAdornment, TextField } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
export default function FormMessageInput({message, setMessage, sendMessage, isLoading}) {
  return (
    <form style={{display: 'flex'}} onSubmit={sendMessage}>
        <TextField disabled={isLoading} value={message} onChange={(e) => setMessage(e.target.value)} fullWidth placeholder="Type a Message"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FaRegTrashAlt onClick={() => setMessage('')} size={20} style={{ cursor: 'pointer', marginRight: 10 }} />
              <IoIosSend size={20} style={{ cursor: 'pointer' }} onClick={sendMessage}/>
            </InputAdornment>
          ),
        }}
        />
    </form>
  )
}
