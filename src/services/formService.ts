const googleScriptUrl =
  "https://script.google.com/macros/s/AKfycbxmFyb6lL29Wuq4Ml7-3Tmy9tVmVkfWEP5IeDu374ZwKMDNfTE6ftkC1FCRUKWqAlgs4A/exec";

export const submitForm = async (form: HTMLFormElement) => {
  try {
    let requestBody = new FormData(form);
    const res = await fetch(googleScriptUrl, {
      method: "POST",
      body: requestBody,
    });
    return res;
  } catch (error) {
    console.log("Something went wrong - ", error);
  }
};
