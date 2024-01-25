import jwt from "jsonwebtoken";
export const generarJTW = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("NO SE PUEDO GENRAR EL JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
