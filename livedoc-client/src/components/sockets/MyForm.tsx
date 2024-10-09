import { FormEvent, useState } from 'react';
import { socket } from '../../lib/socket';

export function MyForm() {
  const [value, setValue] = useState('');

 function onSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();

   socket.timeout(5000).emit('msg', value);
  }

  return (
    <form onSubmit={ onSubmit }>
      <input className='border border-black' onChange={ e => setValue(e.target.value) } />

      <button type="submit">Submit</button>
    </form>
  );
}