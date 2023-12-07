import { createTask, deleteTask, findAll, findById, updateTask } from "../../servicios/tareaService.js";

export default async function (fastify, opts) {
    // GET de todo (findAll)
    fastify.get('/', async function (request, reply) {
        const response = await findAll();

        return response;
    })

    ///////////////////////////////////////////////////

    const params = {
        type: "object",
        properties: {
            id: {
                type: "number"
            }
        }
    }

    // GET by id
    fastify.get('/:id', { schema: { params: params } }, async function (request, reply) {
        const id = request.params.id;

        try {
            const response = await findById(id);
            return response;
        } catch (error) {
            return reply.notFound(error.message);
        }
    })

    ///////////////////////////////////////////////////

    const bodySchema = {
        type: "object",
        properties: {
            name: { type: "string", minLength: 5, maxLength: 10 },
            description: { type: "string" },
            time: { type: "number", minimum: 5 }
        }
    }

    // POST para agregar una task a la base de datos
    fastify.post('/', { schema: { body: bodySchema } }, async function (request, reply) {
        return await createTask(request.body);
    })

    ///////////////////////////////////////////////////

    // PUT para actualizar por id algun valor de la base
    fastify.put('/:id', { schema: { params: params, body: bodySchema } }, async function (request, reply) {
        try {
            const id = request.params.id;
            const task = request.body;

            return await updateTask(id, task);
        } catch (error) {
            throw new Error(`Hubo un problema al hacer el put!!!! => ` + error.message);
        }
    })

    ///////////////////////////////////////////////////

    fastify.delete('/:id', { schema: { params: params } }, async function (request, reply) {
        try {
            const id = request.params.id;

            return await deleteTask(id);
        } catch (error) {
            throw new Error(`Hubo un problema al hacer el delete!!!! => ` + error.message);
        }
    })
}