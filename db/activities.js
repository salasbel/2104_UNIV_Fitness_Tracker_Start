const { client } = require('./client');

async function createActivity({
    name, 
    description
}) {
    try {
            const { rows: [activity]} = await client.query(`
            INSERT INTO activities(name,description)
            VALUES($1, $2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `, [name, description];
            return activity;
        } catch (error) {
            throw error;
        }
};


async function getAllActivities() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM activities;
        `);
        return rows;
    } catch (error) {
        throw error;
    }   
    
};


async function getActivityById(activityId) {
    try {
        const { rows: [ activity ] } = await client.query(`
            SELECT * FROM activities
            WHERE id=${activityId};
        `);
        return activity;
    } catch (error) {
        throw error;
    }
};


//async function updateActivity() {
    

module.exports = {
    createActivity,
    getAllActivities,
    getActivityById,
    //updateActivity
}



