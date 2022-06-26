
import React, { useState, useEffect } from 'react';
import {
    AppShell,
    Navbar, Header,

    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger, List, ThemeIcon,
    useMantineTheme, Grid,
    Group, ActionIcon, useMantineColorScheme, Box
} from '@mantine/core';
import { Sun, MoonStars, CircleCheck, CircleDashed, Logout } from 'tabler-icons-react';
import GetStartedIcon from './get_started_icon';
import { MainLinks } from './main_links';
import ProfilePage from '../profile/profile';
import ErrorPage from '../error/error';
import GalleryPage from '../gallery/gallery';
import UploadPage from '../upload/upload';
import { Link, useNavigate } from 'react-router-dom';


interface HomePageProps {
    colorClickHandler: () => void
}

const HomePage: React.FC<HomePageProps> = (props) => {
    const { colorClickHandler } = props;
    const theme = useMantineTheme();
    const [page, setPage] = useState("gallery");
    const [opened, setOpened] = useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();


    useEffect(() => {
        let tk = window.localStorage.getItem("token");
        if (tk == undefined || tk.length == 0) {
            navigate('/login');
        }

    }, []);


    return (
        <div>
            <AppShell
                padding="md"
                navbar={<Navbar width={{ base: 300 }} >
                    <Box
                        sx={(theme) => ({
                            paddingLeft: theme.spacing.xs,
                            paddingRight: theme.spacing.xs,
                            paddingBottom: theme.spacing.lg,
                            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                }`,
                        })}
                    >
                        <List
                            spacing="xs"
                            size="sm"
                            center
                            icon={
                                <ThemeIcon color="teal" size={24} radius="xl">
                                    <CircleCheck size={16} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item style={{ marginTop: "10px" }}>

                                <Grid>
                                    <Grid.Col span={6} >
                                        <a href="https://github.com/Arthur-Kamau/photopia/" target="_blank" rel="noopener noreferrer" >
                                            <Text style={{ marginTop: "4px" }}>GitHub(clone/view)</Text>
                                        </a>
                                    </Grid.Col>
                                    <Grid.Col span={4}></Grid.Col>
                                    <Grid.Col span={2}> <ActionIcon variant="default" onClick={() => {
                                        toggleColorScheme();
                                        colorClickHandler()
                                    }} size={30}>
                                        {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
                                    </ActionIcon></Grid.Col>
                                </Grid>



                            </List.Item>

                        </List>

                    </Box>
                    <MainLinks click={(label) => {
                        setPage(label.toLocaleLowerCase())
                    }} />

                </Navbar>}
                header={<Header height={60} p="xs">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <h2>Photo App</h2>

                        <Group position="right" mt="md">
                            <div style={{ alignContent: "end", textAlign: "left", alignSelf: "end" }} onClick={(e) => {
                                window.localStorage.setItem("token", "");
                                navigate("/login");
                            }}>
                                <ThemeIcon color="red" variant="light">
                                    <Logout />
                                </ThemeIcon>

                            </div>
                        </Group>
                    </div>

                </Header>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
                {/* Your application here */}

                {
                    page == "gallery" ? <GalleryPage /> :
                        page == "profile" ? <ProfilePage /> :
                            page == "upload" ? <UploadPage /> :

                                <ErrorPage />

                }
            </AppShell>
        </div>
    )
};

export default HomePage;