import {addFeature} from "../services/feature/addFeature.js";
import {updateFeature} from "../services/feature/updateFeature.js";
import {deleteFeature} from "../services/feature/deleteFeature.js";

class FeatureController {

    async addFeature(req, res) {

        const { name, icon } = req.body;
        const feature = await addFeature({name, icon});
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

}

export default new FeatureController();