const express = require('express');
const validateSession = require('../middlewares/validateSession');
const ControllerEliminated = require('../controllers/ControllerEliminated');

const recyclebin = (app) => {
    let response = {
        "data": "message",
        "code": "code"
    };
    app.route("/recyclebin")
        .get(async (req, res) => {
        if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerEliminated();
            controller.getAllEliminated();
        })

        .patch(async (req, res) => {
        if (!(await validateSession(req, res, response))) return;
            const controller = new ControllerEliminated();
        })
}

module.exports = recyclebin;