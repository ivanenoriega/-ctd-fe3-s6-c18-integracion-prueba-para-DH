import { List, ListItem, Box, Typography } from "@mui/material";
import { Student } from "../pages/api/db";

type Props = {
    students: Student[]
};

const StudentList: React.FC<Props> = ({ students }) => {
    const showRedColor = (grade: string) => parseInt(grade) < 6;
    return (
        <List>
            {
                students.map(({ id, nombre, curso, calificaciones: { PrimerCuatr, SegundoCuatr } }: Student) => {
                    const primerCuatrColor = showRedColor(PrimerCuatr) ? 'error' : 'text.primary';
                    const segundoCuatrColor = showRedColor(SegundoCuatr) ? 'error' : 'text.primary';
                    return (
                        <ListItem key={id}>
                            <Box>
                                <Typography variant='h3'>{nombre}</Typography>
                                <List>
                                    <ListItem divider>
                                        <Typography variant='body1'>Curso: {curso}</Typography>
                                    </ListItem>
                                    <ListItem divider>
                                        <Typography color={primerCuatrColor} variant='body1'>
                                            Primer Cuatrimestre: {PrimerCuatr}
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography color={segundoCuatrColor} variant='body1'>
                                            Segundo Cuatrimestre: {SegundoCuatr}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Box>
                        </ListItem>
                    )
                })
            }
        </List>
    );
};

export default StudentList;