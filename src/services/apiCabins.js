import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-$(newCabin.image.name)`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://ftlfpzomxetqtrfrjxnz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  // 2. Upload image
  //  We need to specify the image path, that we want to create.

  //const avatarFile = event.target.files[0];
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // , {
  //   cacheControl: "3600",
  //   upsert: false,
  // });

  // 3. Prevent a new cabin for being created in case in case
  //    that this file didn't upload correctly.
  // Delete the cabin IF there was an error uploading image.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("The selected cabin could not be deleted!");
  }
  return data;
}
