import React from "react"
import { useMutation, gql } from "@apollo/client";

const SINGLE_UPLOAD = gql`
  mutation($files: Upload!) {
    uploadFiles(data: $files) 
  }
`;

const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    console.log({ file: file, validity })
    return validity.valid && mutate({ variables: { data: file } });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  );
};


export default UploadFile