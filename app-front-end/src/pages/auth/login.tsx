
import React, { useState, useEffect } from 'react';
import { TextInput, Text, Checkbox, Button, Group, Box, PasswordInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'tabler-icons-react';

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    bodyFormData.append('email', values.email);
    bodyFormData.append('password', values.password);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
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

  };

  useEffect(() => {

    let tk = window.localStorage.getItem("token");
    if (tk != undefined && tk.length > 0) {
      navigate('/home');
    }

  }, []);

  return (
    <Box sx={{ maxWidth: 300, marginTop: "200px" }} mx="auto">
      {
        error.length > 0 ? <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red">
          Something terrible happened! You probably made a mistake or netwrk is poor, check api url and internet
        </Alert> : <React.Fragment />
      }

      <h3 style={{ textAlign: "center" }}><Text>Photo Pia login</Text></h3>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />


        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      <br/>
      <br/>
      <Link to="/register"> Don't have an account  Register</Link> 
    </Box>
  );
};

export default LoginPage;