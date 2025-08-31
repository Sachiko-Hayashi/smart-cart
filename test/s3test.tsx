import { ChangeEvent ,useState } from 'react'
import { uploadData } from 'aws-amplify/storage';

export function UploadImage() {
  const [file, setFile] = useState<File | null>( null );

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] || null);
  };

  function handleClick () {
   if (!file) {
       return;
    }
    uploadData({
      path: `upload/${file.name}`,
      data: file,
    });
  };

  return (
    <div>
      <input type = 'file' onChange = { handleChange } />
      <button onClick = { handleClick } > upload </button>
    </div>
    );
};