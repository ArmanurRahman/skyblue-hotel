import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be deleted");
    }
    return data;
}

export async function createEditCabin(cabin, id) {
    const hasImagePath =
        typeof cabin.image === "string"
            ? cabin.image?.startsWith(supabaseUrl)
            : false;
    const imageName = `${new Date().valueOf()}-${cabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? cabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
    let query = supabase.from("cabins");
    if (!id) {
        query = query.insert([{ ...cabin, image: imagePath }]);
    }

    if (id) {
        query = query.update({ ...cabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be created");
    }

    if (hasImagePath) {
        return data;
    }
    const { error: storageError } = await supabase.storage
        .from("cabins")
        .upload(imageName, cabin.image);
    if (storageError && data[0]) {
        await supabase.from("cabins").delete().eq("id", data[0].id);
    }
    return data;
}
