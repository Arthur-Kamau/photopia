
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Text, Checkbox, Button, Group, Box, PasswordInput, Alert, useMantineTheme, MantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'tabler-icons-react';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';


function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

const UploadPage = () => {
  const openRef = useRef<() => void>();
  const [files, setFiles] = useState([] as File[]);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  type FormValues = typeof form.values;

  const handleSubmit = (values: FormValues) => {

    var bodyFormData = new FormData();
    bodyFormData.append('file', values.email);
    bodyFormData.append('password', values.password);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response: AxiosResponse) {
      console.log(response);
      // if (response.status == 200) {
      //   window.localStorage.setItem("token", response.data["access_token"])
      //   navigate('/home');
      // }
    })
      .catch(function (error: AxiosError) {
        console.log(error);
        setError("An error ocures")
      });

  };

  useEffect(() => {

    let tk = window.localStorage.getItem("token");
    if (tk != undefined && tk.length > 0) {
      setToken(tk);
    }

  }, []);

  // const openRef = useRef<() => void>();

  return (
    <Box sx={{ maxWidth: 500, marginTop: "100px" }} mx="auto">
      {
        error.length > 0 ? <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
          Something terrible happened! You probably made a mistake or netwrk is poor, check api url and internet
        </Alert> : <React.Fragment />
      }

      <h3 style={{ textAlign: "center" }}><Text>Select image</Text></h3>

      <form onSubmit={form.onSubmit(handleSubmit)}>

        {
          files.length > 0 ? files.map((item, index) => {
            var fr = new FileReader();
            fr.readAsDataURL(item);
            fr.onload = function (e) {
              document.querySelector("#item-" + index)!.setAttribute("src", e.target!.result as string);
            };

            return <div>

              <img style={{ maxHeight: "300px", maxWidth: "300px" }} src="" alt="image" id={"item-" + index} />
            </div>
          }) : <Dropzone
            onDrop={(files) => { console.log('accepted files', files); setFiles(files); }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            {(status) => dropzoneChildren(status, theme)}
          </Dropzone>
        }



        {files.length > 0 ? <Group position="center" mt="md">
          <Button onClick={() => { // openRef?.current()!

            for (let index = 0; index < files.length; index++) {
              const element = files[index];
              var bodyFormData = new FormData();
              // bodyFormData.append('file', element.arrayBuffer);
              axios({
                method: "post",
                url: "https://ptsv2.com/t/7qnn4-1656240082/post",//"http://127.0.0.1:8000/api/photos",
                data: bodyFormData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`
                }
              }).then(function (response: AxiosResponse) {
                console.log(response);
                if (response.status == 200) {
                  window.localStorage.setItem("token", response.data["access_token"])
                  navigate('/home');
                }
              })
                .catch(function (error: AxiosError) {
                  console.log(error);
                  setError("An error ocures")
                });
            }



          }}>Upload Files</Button>

          <Button color="red" onClick={() => {
            setFiles([]);
          }}>Cancel Selectd</Button>
        </Group> : <React.Fragment />}





        {/* <Group position="right" mt="md">
          <Button type="submit">Upload</Button>
        </Group> */}
      </form>
      <br />
      <br />
    </Box>
  )
};

export default UploadPage;