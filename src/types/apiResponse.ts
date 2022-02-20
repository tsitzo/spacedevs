export type NewsArticle = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: Date;
  updatedAt: Date;
  featured: boolean;
  launches: {
    id: string;
  };
};

export interface Launch {
  id: string;
  url: string;
  slug: string;
  name: string;
  status: {
    id: number;
    name: string;
    abbrev: string;
    description: string;
  };
  last_updated: Date;
  net: Date;
  window_end: Date;
  window_start: Date;
  lsp_name: string;
  mission: null | string;
  mission_type?: string;
  pad: string;
  location: string;
  landing: null | string;
  landing_success: number | null;
  launcher: null | string;
  orbit: null | string;
  image: null | string;
  infographic: null | string;
}

export interface LaunchDetailed {
  id: string;
  url: string;
  slug: string;
  flightclub_url: null | string;
  r_spacex_api_id: null | string;
  name: string;
  status: OrbitClass;
  last_updated: string;
  updates: Update[];
  net: string;
  window_end: string;
  window_start: string;
  probability: number | null;
  holdreason: null | string;
  failreason: null | string;
  hashtag: null;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission: Mission | null;
  pad: Pad;
  infoURLs: URL[];
  vidURLs: URL[];
  webcast_live: boolean;
  image: null | string;
  infographic: null | string;
  program: Program[];
  orbital_launch_attempt_count: number | null;
  location_launch_attempt_count: number;
  pad_launch_attempt_count: number;
  agency_launch_attempt_count: number;
  orbital_launch_attempt_count_year: number | null;
  location_launch_attempt_count_year: number;
  pad_launch_attempt_count_year: number;
  agency_launch_attempt_count_year: number;
  mission_patches: MissionPatch[];
}

export interface URL {
  priority: number;
  title: string;
  description: string;
  feature_image: null | string;
  url: string;
}

export interface LaunchServiceProvider {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: null | string;
  country_code: string;
  abbrev: string;
  description: null | string;
  administrator: null | string;
  founding_year: null | string;
  launchers: string;
  spacecraft: string;
  launch_library_url: string;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
  consecutive_successful_landings: number;
  successful_landings: number;
  failed_landings: number;
  attempted_landings: number;
  info_url: null | string;
  wiki_url: null | string;
  logo_url: null | string;
  image_url: null | string;
  nation_url: null | string;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  launch_designator: null;
  type: string;
  orbit: OrbitClass | null;
}

export interface OrbitClass {
  id: number;
  name: string;
  abbrev: string;
  description?: string;
}

export interface MissionPatch {
  id: number;
  name: string;
  priority: number;
  image_url: string;
  agency: AgencyElement;
}

export interface AgencyElement {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Pad {
  id: number;
  url: string;
  agency_id: number | null;
  name: string;
  info_url: null;
  wiki_url: null | string;
  map_url: string;
  latitude: string;
  longitude: string;
  location: PadLocation;
  map_image: string;
  total_launch_count: number;
}

export interface PadLocation {
  id: number;
  url: string;
  name: string;
  country_code: string;
  map_image: string;
  total_launch_count: number;
  total_landing_count: number;
}

export interface Program {
  id: number;
  url: string;
  name: string;
  description: string;
  agencies: AgencyElement[];
  image_url: string;
  start_date: string;
  end_date: null;
  info_url: null | string;
  wiki_url: string;
  mission_patches: any[];
}

export interface Rocket {
  id: number;
  configuration: Configuration;
  launcher_stage: LauncherStage[];
  spacecraft_stage: SpacecraftStage | null;
}

export interface Configuration {
  id: number;
  url: string;
  name: string;
  description: string;
  family: string;
  full_name: string;
  manufacturer: LaunchServiceProvider;
  program: Program[];
  variant: string;
  alias: string;
  min_stage: number | null;
  max_stage: number | null;
  length: number | null;
  diameter: number | null;
  maiden_flight: null | string;
  launch_cost: null | string;
  launch_mass: number | null;
  leo_capacity: number | null;
  gto_capacity: number | null;
  to_thrust: number | null;
  apogee: number | null;
  vehicle_range: null;
  image_url: null | string;
  info_url: null | string;
  wiki_url: null | string;
  total_launch_count: number;
  consecutive_successful_launches: number;
  successful_launches: number;
  failed_launches: number;
  pending_launches: number;
}

export interface LauncherStage {
  id: number;
  type: string;
  reused: boolean;
  launcher_flight_number: number;
  launcher: Launcher;
  landing: Landing;
  previous_flight_date: null;
  turn_around_time_days: null;
  previous_flight: null;
}

export interface Landing {
  id: number;
  attempt: boolean;
  success: null;
  description: string;
  location: LandingLocation;
  type: OrbitClass;
}

export interface LandingLocation {
  id: number;
  name: string;
  abbrev: string;
  description: string;
  location: null;
  successful_landings: number;
}

export interface Launcher {
  id: number;
  url: string;
  details: string;
  flight_proven: boolean;
  serial_number: string;
  status: string;
  image_url: null | string;
  successful_landings: number;
  attempted_landings: number;
  flights: number;
  last_launch_date: null;
  first_launch_date: null;
}

export interface SpacecraftStage {
  id: number;
  url: string;
  mission_end: null;
  destination: string;
  launch_crew: Crew[];
  onboard_crew: any[];
  landing_crew: Crew[];
  spacecraft: Spacecraft;
  docking_events: any[];
}

export interface Crew {
  id: number;
  role: Role;
  astronaut: Astronaut;
}

export interface Astronaut {
  id: number;
  url: string;
  name: string;
  type: AstronautStatus;
  status: AstronautStatus;
  agency: AgencyElement;
  date_of_birth: string;
  date_of_death: null;
  nationality: string;
  twitter: null | string;
  instagram: null | string;
  bio: string;
  profile_image: null | string;
  wiki: null | string;
  last_flight: null | string;
  first_flight: null | string;
}

export interface AstronautStatus {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  role: string;
  priority: number;
}

export interface Spacecraft {
  id: number;
  url: string;
  name: string;
  serial_number: null | string;
  status: AstronautStatus;
  description: string;
  spacecraft_config: SpacecraftConfig;
}

export interface SpacecraftConfig {
  id: number;
  url: string;
  name: string;
  type: AstronautStatus;
  agency: SpacecraftConfigAgency;
  in_use: boolean;
  capability: string;
  history: string;
  details: string;
  maiden_flight: null | string;
  height: number | null;
  diameter: number | null;
  human_rated: boolean;
  crew_capacity: number | null;
  payload_capacity: number | null;
  flight_life: null | string;
  image_url: string;
  nation_url: null | string;
  wiki_link: string;
  info_link: string;
}

export interface SpacecraftConfigAgency {
  id: number;
  url: string;
  name: string;
  featured: boolean;
  type: string;
  country_code: string;
  abbrev: string;
  description: string;
  administrator: string;
  founding_year: string;
  launchers: string;
  spacecraft: string;
  parent: null;
  image_url: null | string;
}

export interface Update {
  id: number;
  profile_image: string;
  comment: string;
  info_url: null | string;
  created_by: string;
  created_on: string;
}
