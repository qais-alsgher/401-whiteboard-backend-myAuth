`use strict`;

class useCommentRouttes {
    constructor(model) {
        this.model = model;
    }

    async read(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id: id } });
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.log(`Error in reading data from modle : (${this.model.name}) with id : ${id}`);
        }
    }

    async create(obj) {
        try {
            return await this.model.create(obj);
        } catch (e) {
            console.log(`Error for creation from modle : (${this.model.name})`);
        }
    }

    async update(id, obj) {
        try {
            const postById = await this.read(id);
            return await postById.update(obj);
        } catch (e) {
            console.log(`Error while ubdate data from modle : (${this.model.name}) with id : ${id} `)
        }
    }

    async delete(id) {
        try {
            return await this.model.destroy({ where: { id: id } });
        } catch (e) {
            console.log(`Error while deleting data from modle : (${this.model.name}) with id : ${id}`);
        }
    }



    async readCommitRelatedPost(Comment) {
        try {
            return await this.model.findAll({ include: [Comment] });
        } catch (e) {
            console.log(`Error while reading comment reation to post for model : ${this.model.name} `);
        }
    }

};

module.exports = useCommentRouttes;
