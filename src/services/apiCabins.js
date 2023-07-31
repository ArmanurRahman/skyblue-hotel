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

export async function createCabin(cabin) {
    const imageName = `${new Date().valueOf()}-${cabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...cabin, image: imagePath }])
        .select();
    if (error) {
        console.log(error);
        throw new Error("Cabins could not be created");
    }

    const { error: storageError } = await supabase.storage
        .from("cabins")
        .upload(imageName, cabin.image);
    if (storageError && data[0]) {
        await supabase.from("cabins").delete().eq("id", data[0].id);
    }
    return data;
}
