// const Response = require("../../.././models/AddResponse");
// const { ObjectId } = require("mongoose").Types;
// const getResponseById = async function (req, res) {
//   try {
//     const id = req.params.id;

//     const gets = await Response.findOneById({
//       _id: ObjectId(id),
//     });

//     if (!gets) {
//       return res.status(404).send();
//     } else {
//       res.status(200).send({
//         status:true,
//         data:gets
//       });
//     }
//   } catch (error) {
//     return res.status(404).send({
//         status:false,
//         data:error
//     });
//   }
// };

// module.exports = getResponseById;