import {createFeature} from "../services/feature/createFeature.js";
import {updateFeature} from "../services/feature/updateFeature.js";
import {deleteFeature} from "../services/feature/deleteFeature.js";
import {getAllFeatures} from "../services/feature/getAllFeatures.js";

class FeatureController {

    async addFeature(req, res) {

        const { name, icon } = req.body;
        const feature = await createFeature({name, icon});
        return res.json(feature);

    }

    async updateFeature(req, res) {

        const { id } = req.params;
        const { name, icon } = req.body;
        const feature = await updateFeature({id, name, icon});
        return res.json(feature);

    }

    async deleteFeature(req, res) {

        const {id} = req.params;
        const feature = await deleteFeature(id);
        return res.json(feature);

    }

    async getAllFeatures(req, res) {

        const features = await getAllFeatures();
        return res.json(features);

    }

}

export default new FeatureController();