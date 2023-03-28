import { Stack, Box, Button, Alert, AlertProps } from "@mui/material";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";

const AddStudentForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [alertSeverity, setAlertSeverity] = useState<AlertProps['severity']>('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const onSubmit = async (data: any) => {
        const student = {
            nombre: data.nombre,
            curso: data.curso,
            email: data.email,
            calificaciones: {
                PrimerCuatr: data.PrimerCuatr,
                SegundoCuatr: data.SegundoCuatr
            },
            fechaNac: data.fechaNac
        }
        try {
            await fetch('http://localhost:3000/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
            setAlertSeverity('success');
            setAlertMessage('Estudiante creado');
            setOpenAlert(true);
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage('Error al crear el estudiante');
            setOpenAlert(true);
        }
    }

    const options = [
        { value: 'CTD', label: 'CTD' },
        { value: 'Data science', label: 'Data science' },
        { value: 'Programacion Web Full Stack', label: 'Programacion Web Full Stack' },
        { value: 'Data Analytics', label: 'Data Analytics' },
        { value: 'Maestria en Negocios Digitales', label: 'Maestria en Negocios Digitales' },
        { value: 'Licenciatura en Negocios Digitales', label: 'Licenciatura en Negocios Digitales' }
    ]

    // Input name props
    const nombreHelperText = errors.nombre?.type === 'required' ? 'Este campo es requerido' : '';
    const nombreError = Boolean(errors.nombre);

    // Select curso props
    const cursoHelperText = errors.curso?.type === 'required' ? 'Este campo es requerido' : '';

    // Input email props
    const emailHelperText = errors.email?.type === 'required' ? 'Este campo es requerido' : '';
    const emailError = Boolean(errors.email);

    // Input Primer Cuatrimestre props
    let primerCuatrHelperText = '';
    switch (errors.PrimerCuatr?.type) {
        case 'required':
            primerCuatrHelperText = 'Este campo es requerido';
            break;
        case 'min':
            primerCuatrHelperText = 'El valor minimo es 1';
            break;
        case 'max':
            primerCuatrHelperText = 'El valor maximo es 10';
            break;
        default:
            primerCuatrHelperText = '';
    }

    // Input Segundo Cuatrimestre props
    let segundoCuatrHelperText = '';
    switch (errors.SegundoCuatr?.type) {
        case 'required':
            segundoCuatrHelperText = 'Este campo es requerido';
            break;
        case 'min':
            segundoCuatrHelperText = 'El valor minimo es 1';
            break;
        case 'max':
            segundoCuatrHelperText = 'El valor maximo es 10';
            break;
        default:
            segundoCuatrHelperText = '';
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
                <Box>
                    <Input
                        label="Nombre"
                        control={control}
                        name="nombre"
                        error={nombreError}
                        helperText={nombreHelperText}
                        rules={{
                            required: true
                        }}
                    />
                </Box>
                <Box>
                    <Select
                        id='curso'
                        control={control}
                        name="curso"
                        label="Curso"
                        options={options}
                        error={Boolean(errors.curso)}
                        helperText={cursoHelperText}
                        rules={{
                            required: true
                        }}
                    />
                    {errors.curso?.type === 'required' && <p>Este campo es requerido</p>}
                </Box>
                <Box>
                    <Input
                        label="Email"
                        control={control}
                        name="email"
                        error={emailError}
                        helperText={emailHelperText}
                        rules={{
                            required: true
                        }}
                    />
                </Box>
                <Box>
                    <Input
                        control={control}
                        label="Primer Cuatrimestre"
                        name="PrimerCuatr"
                        error={Boolean(errors.PrimerCuatr)}
                        helperText={primerCuatrHelperText}
                        type="number"
                        rules={{
                            required: true,
                            min: 0,
                            max: 10
                        }} />
                </Box>
                <Box>
                    <Input
                        control={control}
                        label="Segundo Cuatrimestre"
                        name="SegundoCuatr"
                        error={Boolean(errors.SegundoCuatr)}
                        helperText={segundoCuatrHelperText}
                        type="number"
                        rules={{
                            required: true,
                            min: 0,
                            max: 10
                        }}
                    />
                </Box>
                <Box>
                    <label htmlFor="fechaNac">Fecha de nacimiento</label>
                    <input type="date" id="fechaNac" {...register('fechaNac', { required: false })} />
                    {/* TODO: Complete Date Picker */}
                    {/* <DatePicker /> */}
                </Box>
                <Button type="submit" variant="contained">Crear</Button>
            </Stack>
            {openAlert && <Alert
                sx={{
                    position: 'fixed',
                    bottom: 30,
                }}
                severity={alertSeverity}
                onClose={() => setOpenAlert(false)}
            >
                {alertMessage}
            </Alert>}
        </Box>)
}

export default AddStudentForm