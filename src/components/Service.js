export function getToken() {
  return localStorage.getItem("shidduch-token");
}

export function setToken(userToken) {
  localStorage.setItem("shidduch-token", userToken.token);
}

export function isLoggedIn() {
  const token = getToken();
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  }
  return false;
}

export function getUserData() {
  const token = getToken();
  if (token) {
    return JSON.parse(atob(token.split(".")[1]));
  }
  return {};
}

export async function getMySubmissions() {
  return fetch("/api/my", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function getZivug(zivugId) {
  return fetch(`/api/zivug/${zivugId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function searchForZivug(gender, zip, height, age) {
  return fetch(`/api/search?gender=${gender}&zip=${zip}&height=${height}&age=${age}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function createZivug(zivug) {
  return fetch("/api/zivug", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(zivug),
  }).then((data) => data.json());
}

export async function updateZivug(zivug) {
  return fetch(`/api/zivug/${zivug.zivug_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(zivug),
  }).then((data) => data.json());
}

export async function deleteZivug(zivug) {
  return fetch(`/api/zivug/${zivug.zivug_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function createReference(reference) {
  return fetch(`/api/zivug/${reference.zivug_id}/references`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(reference),
  }).then((data) => data.json());
}

export async function getReferencesForZivug(zivugId) {
  return fetch(`/api/zivug/${zivugId}/references`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function deleteReference(zivugId, referenceId) {
  return fetch(`/api/zivug/${zivugId}/references/${referenceId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function createEducation(education) {
  return fetch(`/api/zivug/${education.zivug_id}/education`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(education),
  }).then((data) => data.json());
}

export async function getEducationForZivug(zivugId) {
  return fetch(`/api/zivug/${zivugId}/education`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function deleteEducation(zivugId, educationId) {
  return fetch(`/api/zivug/${zivugId}/education/${educationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function createFamily(family) {
  return fetch(`/api/zivug/${family.zivug_id}/family`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(family),
  }).then((data) => data.json());
}

export async function getFamilyForZivug(zivugId) {
  return fetch(`/api/zivug/${zivugId}/family`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function deleteFamily(zivugId, familyId) {
  return fetch(`/api/zivug/${zivugId}/family/${familyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((data) => data.json());
}

export async function loginUser(credentials) {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function signupUser(credentials) {
  return fetch("/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export function convertInchesToFeet(inches) {
  return Math.floor(inches / 12);
}

export function getRemainingInches(inches) {
  return inches % 12;
}

export function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
}

export const timeAgo = (() => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const thresholds = [
    {
      threshold: 540 * day,
      modifier: 365 * day,
      render: (elapsed) => `${elapsed} years ago`,
    },
    { threshold: 320 * day, render: () => "a year ago" },
    {
      threshold: 45 * day,
      modifier: 30 * day,
      render: (elapsed) => `${elapsed} months ago`,
    },
    { threshold: 26 * day, render: () => "a month ago" },
    {
      threshold: 36 * hour,
      modifier: 24 * hour,
      render: (elapsed) => `${elapsed} days ago`,
    },
    { threshold: 22 * hour, render: () => "a day ago" },
    {
      threshold: 90 * minute,
      modifier: 60 * minute,
      render: (elapsed) => `${elapsed} hours ago`,
    },
    { threshold: 45 * minute, render: () => "an hour ago" },
    {
      threshold: 90 * second,
      modifier: 60 * second,
      render: (elapsed) => `${elapsed} minutes ago`,
    },
    { threshold: 46 * second, render: () => "a minute ago" },
    { threshold: 0 * second, render: () => "a few seconds ago" },
  ];

  return (date) => {
    const elapsed = Math.round(new Date() - date);
    const { render, modifier } = thresholds.find(
      ({ threshold }) => elapsed >= threshold
    );
    return render(Math.round(elapsed / modifier));
  };
})();
