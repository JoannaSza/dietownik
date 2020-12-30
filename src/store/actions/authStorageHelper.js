export const browserStorageSave = (dataToSave, type) => {
	if (typeof dataToSave === "object" && dataToSave !== null) {
		Object.keys(dataToSave).forEach((key) => {
			switch (type) {
				case "local":
					localStorage.setItem(key, dataToSave[key]);
					break;
				case "session":
					sessionStorage.setItem(key, dataToSave[key]);
					break;
				default:
					break;
			}
		});
	}
};

export const browserStorageRemove = (dataToRemove, type) => {
	if (typeof dataToRemove === "object" && dataToRemove !== null) {
		dataToRemove.forEach((key) => {
			switch (type) {
				case "local":
					localStorage.removeItem(key, dataToRemove[key]);
					break;
				case "session":
					sessionStorage.removeItem(key, dataToRemove[key]);
					break;
				default:
					break;
			}
		});
	}
};

export const browserStorageGet = (dataToGet, type) => {
	let data = {};
	if (typeof dataToGet === "object" && dataToGet !== null) {
		dataToGet.forEach((key) => {
			switch (type) {
				case "local":
					data = { ...data, [key]: localStorage.getItem(key, dataToGet[key]) };
					break;
				case "session":
					data = {
						...data,
						[key]: sessionStorage.getItem(key, dataToGet[key]),
					};
					break;
				default:
					break;
			}
		});
	}
	return data;
};
