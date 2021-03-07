import moment from 'moment';
import { Response } from 'express';
import { literal } from 'sequelize';

import db from '../models';
import { ModifiedRequest } from '../types';

const { groups, usergroups, groupstats, user } = db;

export async function joinGroup(req: ModifiedRequest, res: Response) {
  const { userId, params } = req;
  const { id } = params;

  const groupExists = await groups.findOne({
    where: {
      id,
    },
  });

  if (groupExists) {
    // Check that user is not in group
    const uInGroup = await usergroups.findOne({
      where: {
        userId,
        groupId: id,
      },
    });

    if (!uInGroup) {
      await usergroups
        .create({
          userId,
          groupId: id,
          isAdmin: false,
        })
        .then(async (u) => {
          await groups.update(
            {
              members: literal('members + 1'),
            },
            {
              where: {
                id,
              },
            },
          );

          const today = new Date(moment().format('YYYY-MM-DD'));

          await groupstats
            .findOrCreate({
              where: { createdAt: today },
              defaults: {
                users: 0,
                groupId: id,
                createdAt: today,
              },
            })
            .then(async (r) => {
              await groupstats.update(
                {
                  users: literal('users + 1'),
                },
                {
                  where: {
                    groupId: id,
                    createdAt: today,
                  },
                },
              );
            });
        });

      return listUserGroups(req, res);
    } else {
      return res.status(400).json({
        status: false,
        message: `You're already a member of this group`,
        data: null,
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: `Group does not exist`,
      data: null,
    });
  }
}

export async function listUserGroups(req: ModifiedRequest, res: Response) {
  const { userId } = req;

  const uGroups = await usergroups.findAll({
    where: {
      userId,
    },
    include: [{ model: groups }],
  });

  res.status(200).json({
    status: true,
    message: 'Users groups retrieved successfully',
    data: uGroups,
  });
}

export async function createGroup(req: ModifiedRequest, res: Response) {
  const { userId, body } = req;
  const { name, desc } = body;

  const exists = await groups.findOne({
    where: {
      name,
    },
  });

  if (exists) {
    return res.status(400).json({
      status: false,
      message: `There's already a group named ${name}`,
      data: null,
    });
  } else {
    const group = await groups
      .create({
        name,
        desc,
        members: 1,
        admin: userId,
      })
      .then(async (u) => {
        await usergroups.create({
          userId,
          groupId: u.id,
          isAdmin: true,
        });

        const today = new Date(moment().format('YYYY-MM-DD'));

        await groupstats.create({
          users: 1,
          groupId: u.id,
          createdAt: today,
        });

        return u;
      })
      .catch((e) => {
        console.log(e);
        return { err: true };
      });

    if (group.err) {
      return res.status(403).json({
        status: false,
        message: `An error occured while creating your group`,
        data: null,
      });
    } else {
      return listUserGroups(req, res);
    }
  }
}

export async function getGroupById(req: ModifiedRequest, res: Response) {
  const { userId, params } = req;
  const { id } = params;

  const group = await groups.findOne({
    where: {
      id,
    },
  });

  if (group) {
    const members = await usergroups.findAll({
      where: {
        groupId: id,
      },
      include: [{ model: user, attributes: ['name', 'id'] }],
    });

    const stats = await groupstats.findAll({
      where: {
        groupId: id,
      },
    });

    res.status(200).json({
      status: true,
      message: 'Users groups retrieved successfully',
      data: {
        group,
        members,
        stats,
      },
    });
  }
}

export async function removeUserFromGroup(req: ModifiedRequest, res: Response) {
  const { params } = req;
  const { groupId, userId } = params;

  await usergroups.destroy({
    where: {
      userId,
      groupId,
    },
  });

  const listMembers = await usergroups.findAll({
    where: {
      groupId,
    },
    include: [{ model: user, attributes: ['name'] }],
  });

  res.status(200).json({
    status: true,
    message: 'User deleted successfully',
    data: listMembers,
  });
}
