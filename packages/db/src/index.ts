const { prisma } = require('./client');
const generated = require('./../generated/client');

module.exports = {
  prisma,
  ...generated
};
