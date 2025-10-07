import {createFeature} from "../services/feature/createFeature.js";
import {updateFeature} from "../services/feature/updateFeature.js";
import {deleteFeature} from "../services/feature/deleteFeature.js";
import {getAllFeatures} from "../services/feature/getAllFeatures.js";
import {getOneFeature} from "../services/feature/getOneFeature.js";

class FeatureController {

    async getAllFeatures(req, res, next) {

        try {

            const features = await getAllFeatures();
            return res.status(200).json({
                data: features,
            });

        } catch(e) {
            next(e);
        }

    }

    async getOneFeature(req, res, next) {

        try {

            const {id} = req.params;
            const feature = await getOneFeature(id);
            return res.status(200).json({
                data: feature,
            });

        } catch(e) {
            next(e);
        }

    }

    async createFeature(req, res, next) {

        try {

            const {name, icon} = req.body;
            const feature = await createFeature({name, icon});
            return res.status(200).json({
                data: feature,
            });

        } catch(e) {
            next(e);
        }

    }

    async updateFeature(req, res, next) {

        try {

            const {id} = req.params;
            const featureName = await updateFeature(id, req.body);
            return res.status(200).json({
                message: `Feature ${featureName} was updated successfully`,
            });

        } catch(e) {
            next(e);
        }

    }

    async deleteFeature(req, res, next) {

        try {

            const {id} = req.params;
            const featureName = await deleteFeature(id);
            return res.status(200).json({
                message: `Feature ${featureName} was deleted successfully`,
            });

        } catch(e) {
            next(e);
        }

    }

}

export default new FeatureController();