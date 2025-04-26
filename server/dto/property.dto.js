import ApiError from "../error/ApiError.js";

export class PropertyDto {

    constructor({
        name,
        address_line,
        price,
        images,
        status,
        description,
        property_size,
        num_bedrooms,
        num_bathrooms,
        company_id,
        project_id,
        location_id,
        type_id
    }) {
        if([
            name,
            address_line,
            price,
            images,
            status,
            description,
            property_size,
            num_bedrooms,
            num_bathrooms,
            company_id,
            project_id,
            location_id,
            type_id
        ].some(i => !i)) {
            throw ApiError.badRequest("Please enter a valid info!");
        }

        this.name = name;
        this.address_line = address_line;
        this.price = price;
        this.images = images;
        this.status = status;
        this.description = description;
        this.property_size = property_size;
        this.num_bedrooms = num_bedrooms;
        this.num_bathrooms = num_bathrooms;
        this.company_id = company_id;
        this.project_id = project_id;
        this.location_id = location_id;
        this.type_id = type_id;
    }

}