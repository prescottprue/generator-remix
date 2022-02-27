import type { LinksFunction, LoaderFunction } from "remix";
import { Outlet, Link, useLoaderData } from "remix";
import { Project } from "@prisma/client";
import { Card, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete'
import { getUser } from "~/utils/session.server";
import { db } from "~/utils/db.server";

import stylesUrl from "~/styles/projects.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  projectListItems: Project[];
};

export let loader: LoaderFunction = async ({ params, request }) => {
  console.log('params in loader', params); // <-- {jokeId: "123"}
  const user = await getUser(request);
  console.log('user', user)

  const data: LoaderData = {
    projectListItems: await db.project.findMany(),
    user
  };
  console.log('data in loader', data)
  return data;
};

export default function ProjectsRoute() {
  const { projectListItems: projects } = useLoaderData<LoaderData>();

  return (
    <div className="projects-layout">
      <header className="projects-header">
        <div className="container">
          <Typography variant="h4" title="<%= appName %> Project" aria-label="<%= appName %> Project">
            Projects
          </Typography>
        </div>
      </header>
      <main>
      <Button variant="contained" component={Link} to="/projects/new">
        Add your own
      </Button>
      <div className="projects-outlet">
        <Outlet />
      </div>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '60vh' }}
      >
        {projects?.length ?
          projects.map((project, ind) => {
            const { id: projectId, createdAt, name, ...rest } = project || {}
            const showDelete = true
            const createdAtDate = new Date(createdAt)
            function deleteRepo() {
              console.log('Not yet implemented')
            }
            return (
              <Grid item xs={3} key={projectId}>
                <Card role="listitem" sx={{ minWidth: 300, minHeight: 200 }}>
                  <CardHeader
                    action={
                      showDelete ? (
                        <Tooltip title="Delete">
                          <IconButton onClick={deleteRepo}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      ) : null
                    }
                    title={
                      <Typography component={Link} to={`/projects/${projectId}`}>
                        {name}
                      </Typography>
                    }
                    subheader={`${createdAtDate.getMonth()}/${createdAtDate.getDay()}/${createdAtDate.getFullYear()}`}
                  />
                </Card>
              </Grid>   
            )
          })
        : (
          <Typography variant="h5">
            No Projects Found. Click "Add Project" above to add one
          </Typography>
        )}
      </Grid>
      </main>
    </div>
  );
}