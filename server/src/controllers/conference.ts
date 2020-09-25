import * as conferenceService from "../services/conference";
import { asyncHandler } from "../common/helpers";

export const get = asyncHandler(async function (req: any, res: any) {
    const confs = await conferenceService.getConferences();
    return res.json({ success: true, data: confs });
})

export const getById = asyncHandler(async function (req: any, res: any) {
    const { id } = req.params;
    const conf = await conferenceService.getConference(id);
    return res.json({ success: true, data: conf });
})

export const post = asyncHandler(async function (req: any, res: any) {
    const c = req.body;
    const conf = await conferenceService.createConference(c);
    return res.json({ success: true, data: conf });
})

export const getWithParticipants = asyncHandler(async function (req: any, res: any) {
    const { namespace, username } = req.query;
    if (!namespace || !username) throw new Error('namespace and username are required');
    const data = await conferenceService.getConferencesWithParticipants(namespace, username);
    return res.json({ success: true, data });
})

export const invite = asyncHandler(async function (req: any, res: any) {
    const json = req.body;
    if (!json.userFrom || !json.userTo || !json.conferenceId || !json.post) throw Error('userFrom, userTo, conferenceId, post are required');
    await conferenceService.invite(json.userFrom, json.userTo, json.conferenceId, json.post);
    return res.json({ success: true });
})

export const withdraw = asyncHandler(async function (req: any, res: any) {
    const json = req.body;
    if (!json.userFrom || !json.userTo || !json.conferenceId || !json.post) throw Error('userFrom, userTo, conferenceId, post are required');
    await conferenceService.withdraw(json.userFrom, json.userTo, json.conferenceId, json.post);
    return res.json({ success: true });
})

export const attend = asyncHandler(async function (req: any, res: any) {
    const json = req.body;
    if (!json.user || !json.conferenceId) throw Error('user, conferenceId are required');
    await conferenceService.attend(json.user, json.conferenceId);
    return res.json({ success: true });
})

export const absend = asyncHandler(async function (req: any, res: any) {
    const json = req.body;
    if (!json.user || !json.conferenceId) throw Error('user, conferenceId are required');
    await conferenceService.absend(json.user, json.conferenceId);
    return res.json({ success: true });
})