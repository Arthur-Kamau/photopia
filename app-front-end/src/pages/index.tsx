
import { Box, Button, Group } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const IndexPage = () => {

  const navigate = useNavigate();
  const [token, setToken] = useState("");
  useEffect(() => {

    let tk = window.localStorage.getItem("token");
    if (tk != undefined && tk.length > 0) {
      setToken(tk);
    }

  }, []);

  return (
    <div>
      <Box sx={{ maxWidth: 500, marginTop: "200px" }} mx="auto">
        <h2>Phot pia</h2>
        <label>Objective</label>
        <ul>
          <li> allows users to upload their photos for backing up</li>
          <li> displays all backed up photos to users</li>
          <li> allows users to manage their photos backups: deleting some and editing photos metadata</li>
          <li> allows users to group backed up images in different albums</li>
          <li> allows users to share single photos and photo albums both: both public and public sharing mode</li>
        </ul>

        <Group position="center" mt="md">
          {
            token.length > 0 ? <Button onClick={(e: any) => { navigate('/home'); }}>Home</Button> :

              <React.Fragment>
                <Button onClick={(e: any) => { navigate('/login'); }}>Login</Button>

                <Button onClick={(e: any) => { navigate('/register'); }}>Register</Button>
              </React.Fragment>
          }

        </Group>
      </Box>
    </div>
  )
};

export default IndexPage;