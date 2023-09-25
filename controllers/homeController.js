const { User } = require('../models')


class HomeController {
    //gett all user where status animal care is on
    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                where: {
                    status_animal_care: "on"
                }
            })
            //res.status if users empty
            if (users.length === 0) {
                return res.status(404).json({ message: "No users found" })
            }
            // res.status(200).json(users) data user full_name,email,phone_number,status_animal_care
            res.status(200).json({users:
                users.map(user => {
                    return {
                        id: user.id,
                        full_name: user.full_name,
                        email: user.email,
                        phone_number: user.phone_number,
                        status_animal_care: user.status_animal_care
                    }
                })
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = HomeController