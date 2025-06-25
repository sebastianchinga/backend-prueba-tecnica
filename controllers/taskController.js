import Task from "../models/Task.js"

export const home = async (req, res) => {
    const { usuario } = req;
    const tasks = await Task.findAll({ where: { usuarios_id: usuario.id }, order: [['id', 'DESC']] });
    if (!tasks) {
        return;
    }

    res.json(tasks);
}

export const crear = async (req, res) => {
    const { usuario } = req
    const task = new Task(req.body);
    task.usuarios_id = usuario.id;
    const resultado = await task.save();
    res.status(200).json(resultado)
}

export const buscar = async (req, res) => {
    const { id } = req.params
    const task = await Task.findOne({ where: { id } });
    if (!task) {
        res.status(400).json({ msg: 'Tarea no encontrada' });
        return
    }
    res.json(task);
}

export const cambiar = async (req, res) => {
    const { id } = req.params
    const task = await Task.findOne({ where: { id } });
    if (!task) {
        res.status(400).json({ msg: 'Tarea no encontrada' });
        return
    }

    if (task.estado) {
        task.estado = false
    } else {
        task.estado = true
    }

    await task.save();
    res.json(task)
}

export const filtrar = async (req, res) => {
    const { estado } = req.params
    const { usuario } = req
    const id = usuario.id
    const task = await Task.findAll({ where: { usuarios_id: id,  estado} });
    if (!task) {
        res.status(400).json({ msg: 'Tarea no encontrada' });
        return
    }
    res.json(task);

}