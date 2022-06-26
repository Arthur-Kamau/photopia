import React, { useState, useEffect } from 'react';
import { TextInput, Text, Checkbox, Button, Group, Box, PasswordInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'tabler-icons-react';

interface Profile {
  id: number,// 2,
  name: string,// "kamau",
  email: string, //"kamaukenn11@gmail.com",
  email_verified_at: number, //null,
  created_at: string,// "2022-06-26T09:44:06.000000Z",
  updated_at: string, //"2022-06-26T09:44:06.000000Z"
}
const ProfilePage = () => {
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: false,
    },

    validate: {
      name: (value) => value.length > 3 ? null : "name too short",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),

    },
  });

  useEffect(() => {

    let tk = window.localStorage.getItem("token");
    if (tk != undefined && tk.length > 0) {
      axios.get('http://127.0.0.1:8000/api/gallery', {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      })
        .then(function (response) {
          // handle success
          console.log(response);
          let profile: Array<Profile> = response.data;

          setProfile(profile);

        })
        .catch(function (error) {
          // handle error
          console.log(error);

          setError("error ")
        });

    }

  }, []);
  return (
    <div>
      <h2>profile </h2>

      <Box sx={{ maxWidth: 300, marginTop: "200px" }} mx="auto">
        {
          error.length > 0 ? <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
            {error} <br />
            Something terrible happened! You probably made a mistake or netwrk is poor, check api url and internet
          </Alert> : <React.Fragment />
        }

        <h3 style={{ textAlign: "center" }}><Text>Photo Pia login</Text></h3>

        <form >
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <TextInput
          id='email_field'
          dis
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />



        </form>
        <br />
        <br />
        <Link to="/register"> Don't have an account  Register</Link>
      </Box>
    </div>
  )
};

export default ProfilePage;