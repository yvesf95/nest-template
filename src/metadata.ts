/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./common/entities/base.entity"), { "BaseEntity": { id: { required: true, type: () => String }, createdDate: { required: true, type: () => Object, default: new Date() }, lastUpdatedDate: { required: false, type: () => Date }, version: { required: true, type: () => Object, default: 1 } } }], [import("./modules/users/user.entity"), { "User": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String }, "getError": { type: String } } }]] } };
};