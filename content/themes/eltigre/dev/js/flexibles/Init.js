import SECTIONS from '../constants/sections.js';

export default function initFlexibleSections() {
    let activeSections = [];
    
    for (var section in SECTIONS)
        if (document.querySelector(`.${section}`))
            try {
                activeSections.push(new SECTIONS[section]());
            } catch (e) {
                console.error(section, e);
            }

    return activeSections;
}
