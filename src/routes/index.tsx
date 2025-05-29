import { json } from "@solidjs/router";
import {
  Show,
  createResource,
  createSignal,
  onMount,
  onCleanup,
} from "solid-js";
import { JohnnyBoy, LeroyMerlin } from "~/components/Logo";

const [realTimePower, setRealTimePower] = createSignal(0);
const [cumulativeEnergy, setcumulativeEnergy] = createSignal(0);
const [monthEnergy, setmonthEnergy] = createSignal(0);
const [dailyEnergy, setdailyEnergy] = createSignal(0);
const [yearEnergy, setyearEnergy] = createSignal(0);
const [co2ReductionByYear, setco2ReductionByYear] = createSignal(0);
const [equivalentTreePlantingByYear, setequivalentTreePlantingByYear] =
  createSignal(0);
const [standardCoalSavings, setstandardCoalSavings] = createSignal(0);
const [componentFlag, setcomponentFlag] = createSignal(0);
const [co2Reduction, setco2Reduction] = createSignal(0);
const [standardCoalSavingsByYear, setstandardCoalSavingsByYear] =
  createSignal(0);
const [equivalentTreePlanting, setEquivalentTreePlanting] = createSignal(0);
const [stationName, setStationName] = createSignal("");
const [plantAddress, setPlantAddress] = createSignal("");
const [selfSufficiency, setSelfSufficiency] = createSignal(0);

const fetchData = async (): Promise<any> => {
  "use server";
  const response = await fetch(
    "https://uni004eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=Q5bK7jqK0r5BnAysa1cmMtz4gLFzDxj3" // SMH R&D Johnny boy
  );
  return await response.json();
};
export default function Home() {
  const [resource, { refetch }] = createResource(fetchData);

  const parsedData = () => {
    if (resource()?.data) {
      const parsed = JSON.parse(resource().data.replace(/&quot;/g, '"'));
      setStationName(parsed.stationOverview.stationName);
      setPlantAddress(parsed.stationOverview.plantAddress);
      setRealTimePower(parsed.realKpi.realTimePower);
      setcumulativeEnergy(parsed.realKpi.cumulativeEnergy / 1000);
      setmonthEnergy(parsed.realKpi.monthEnergy);
      setdailyEnergy(parsed.realKpi.dailyEnergy);
      setyearEnergy(parsed.realKpi.yearEnergy / 1000);
      setco2ReductionByYear(
        parsed.socialContribution.co2ReductionByYear / 1000
      );
      setco2Reduction(parsed.socialContribution.co2Reduction / 1000);
      setequivalentTreePlantingByYear(
        parsed.socialContribution.equivalentTreePlantingByYear
      );
      setstandardCoalSavings(
        parsed.socialContribution.standardCoalSavings / 1000
      );
      setstandardCoalSavingsByYear(
        parsed.socialContribution.standardCoalSavingsByYear / 1000
      );
      setSelfSufficiency((parsed.realKpi.realTimePower / 250) * 100);
      setEquivalentTreePlanting(
        parsed.socialContribution.equivalentTreePlanting
      );
      setcomponentFlag(parsed.socialContribution.componentFlag);
      return parsed;
    }
    return null;
  };
  // console.log(parsedData());

  onMount(() => {
    // Fetch data immediately when component mounts
    refetch();

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(() => {
      console.log("Data fetched");
      refetch();
    }, 300000);

    // Clean up interval on component unmount
    onCleanup(() => clearInterval(intervalId));
    console.log(parsedData());
  });

  return (
    <main class="mx-auto flex max-md:h-dvh h-[100vh] flex-col p-[0.5vmax] text-center text-gray-700">
      {/* General card */}
      <div class="mb-[0.5vmax] max-md:flex-wrap md:flex flex-grow-0 items-center justify-between rounded-[1.25vmax] border-[0.1vmax] border-slate-300/50 bg-slate-100 px-[1.5vmax] py-[0.75vmax]">
        <div class="max-md:hidden">
          <h1 class="text-left text-[1.5vmax] font-medium">
            Proiect de monitorizare
          </h1>
          <h2 class="text-left text-[1.15vmax] text-slate-500">
            {plantAddress()}
          </h2>
        </div>
        <div class="flex justify-between">
          <h1 class="text-left text-[2vmax] font-medium md:hidden">
            {stationName()}
          </h1>
          <span class="flex h-auto w-[8vmax] max-h-[48px] items-center justify-center mt-2">
            <JohnnyBoy />
          </span>
        </div>
      </div>

      {/* Data cards */}
      <div class="flex flex-grow max-md:flex-col max-md:flex-wrap md:basis-full">
        {/* Left panel */}
        <div class="md:mr-[0.5vmax] max-md:order-2 flex max-md:mt-[0.5vmax] max-md:flex-wrap flex-grow-0  md:flex-col rounded-[1.5vmax] border-[0.1vmax] border-slate-300/50 bg-slate-100 p-[0.5vmax]">
          {/* Production cards */}
          <div class="max-md:mr-[0.35vmax] max-md:mb-[0.35vmax] md:mb-[0.35vmax] flex h-auto max-md:w-[35vw] md:h-full flex-grow flex-col items-start justify-center rounded-[1vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50 max-md:py-[1vmax] px-[2vmax]">
            <h4 class="mb-[0.25vmax] text-[1.35vmax] font-medium text-slate-500">
              Energia Totală
            </h4>
            <div class="flex items-end">
              <Show when={parsedData()}>
                <h4
                  id="cumulativeEnergy"
                  class="align-text-bottom text-[4vmax] leading-none font-medium"
                >
                  {cumulativeEnergy().toFixed(1)}
                  <span class="text-[1.25vmax] font-medium text-slate-500">
                    {" "}
                    MWh
                  </span>
                </h4>
              </Show>
            </div>
          </div>
          <div class="md:mb-[0.35vmax] max-md:mb-[0.35vmax] flex h-auto max-md:w-[35vw] md:h-full flex-grow flex-col items-start justify-center rounded-[1.25vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50 max-md:py-[1vmax] px-[2vmax]">
            <h4 class="mb-[0.25vmax] text-[1.35vmax] font-medium text-slate-500">
              Energia Anuală
            </h4>
            <div class="flex items-end">
              <Show when={parsedData()}>
                <h4
                  id="yearEnergy"
                  class="align-text-bottom text-[4vmax] leading-none font-medium"
                >
                  {yearEnergy().toFixed(1)}
                  <span class="text-[1.25vmax] font-medium text-slate-500">
                    {" "}
                    MWh
                  </span>
                </h4>
              </Show>
            </div>
          </div>
          <div class="max-md:mr-[0.35vmax] md:mb-[0.35vmax] flex h-auto max-md:w-[35vw] md:h-full flex-grow flex-col items-start justify-center rounded-[1.25vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50 max-md:py-[1vmax] px-[2vmax]">
            <h4 class="mb-[0.25vmax] text-[1.35vmax] font-medium text-slate-500">
              Energia Lunară
            </h4>
            <div class="flex items-end">
              <Show when={parsedData()}>
                <h4
                  id="monthEnergy"
                  class="align-text-bottom text-[4vmax] leading-none font-medium"
                >
                  {monthEnergy().toFixed(1)}
                  <span class="text-[1.25vmax] font-medium text-slate-500">
                    kWh
                  </span>
                </h4>
              </Show>
            </div>
          </div>
          <div class="flex h-auto max-md:w-[35vw] md:h-full flex-grow flex-col items-start justify-center rounded-[1.25vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50 max-md:py-[1vmax] px-[2vmax]">
            <h4 class="mb-[0.25vmax] text-[1.35vmax] font-medium text-slate-500">
              Energia de Astăzi
            </h4>
            <div class="flex items-end">
              <Show when={parsedData()}>
                <h4
                  id="dailyEnergy"
                  class="align-text-bottom text-[4vmax] leading-none font-medium"
                >
                  {dailyEnergy().toFixed(1)}
                  <span class="text-[1.25vmax] font-medium text-slate-500">
                    kWh
                  </span>
                </h4>
              </Show>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div class="flex grow flex-col">
          {/* Social contribution cards */}
          <div class="mb-[0.5vmax] max-md:flex-wrap md:flex basis-1/4 rounded-[1.5vmax] border-[0.1vmax] border-slate-300/50 bg-slate-100 p-[0.5vmax]">
            <div class="max-md:mb-[0.35vmax] md:mr-[0.35vmax] flex md:h-full grow flex-col items-center justify-center rounded-[1vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50 p-[0.75vmax] max-md:px-[1.5vmax]">
              <div class="max-md:w-full">
                <h4 class="mb-[0.1vmax] text-start text-[1.25vmax] font-medium text-slate-500">
                  Reducere CO₂
                </h4>
                <div class="flex md:flex-col max-md:justify-between max-md:items-center max-md:w-full md:items-start">
                  <Show when={parsedData()}>
                    <h4
                      id="co2Reduction"
                      class="mb-[0.1vmax] max-md:order-2 align-text-bottom text-[5vmax] leading-none font-medium"
                    >
                      {co2Reduction().toFixed(1)}
                      <span class="text-[1.25vmax] font-medium text-slate-500">
                        {" "}
                        tone
                      </span>
                    </h4>
                    <h4
                      id="co2ReductionByYear"
                      class="align-text-bottom text-[2vmax] leading-none"
                    >
                      {co2ReductionByYear().toFixed(1)}
                      <span class="text-[1vmax] font-medium text-slate-500">
                        {" "}
                        tone/an
                      </span>
                    </h4>
                  </Show>
                </div>
              </div>
            </div>
            <div class="max-md:mb-[0.35vmax] md:mr-[0.35vmax] flex md:h-full grow flex-col items-center justify-center rounded-[1.25vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50 p-[0.75vmax] max-md:px-[1.5vmax]">
              <div class="max-md:w-full">
                <h4 class="mb-[0.1vmax] text-start text-[1.25vmax] font-medium text-slate-500">
                  Echivalent Copaci Plantați
                </h4>
                <div class="flex md:flex-col max-md:justify-between max-md:items-center max-md:w-full md:items-start">
                  <Show when={parsedData()}>
                    <h4
                      id="equivalentTreePlanting"
                      class="mb-[0.1vmax] max-md:order-2 align-text-bottom text-[5vmax] leading-none font-medium"
                    >
                      {equivalentTreePlanting()}
                      <span class="text-[1.25vmax] font-medium text-slate-500">
                        {" "}
                        copaci
                      </span>
                    </h4>

                    <h4
                      id="equivalentTreePlantingByYear"
                      class="align-text-bottom text-[2vmax] leading-none"
                    >
                      {equivalentTreePlantingByYear()}
                      <span class="text-[1vmax] font-medium text-slate-500">
                        {" "}
                        copaci/an
                      </span>
                    </h4>
                  </Show>
                </div>
              </div>
            </div>
            <div class="flex md:h-full grow flex-col items-center justify-center rounded-[1.25vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50 p-[0.75vmax] max-md:px-[1.5vmax]">
              <div class="max-md:w-full">
                <h4 class="mb-[0.1vmax] text-start text-[1.25vmax] font-medium text-slate-500">
                  Economie Cărbune Standard
                </h4>
                <div class="flex md:flex-col max-md:justify-between max-md:items-center max-md:w-full md:items-start">
                  <Show when={parsedData()}>
                    <h4
                      id="standardCoalSavings"
                      class="mb-[0.1vmax] max-md:order-2 align-text-bottom text-[5vmax] leading-none font-medium"
                    >
                      {standardCoalSavings().toFixed(1)}
                      <span class="text-[1.25vmax] font-medium text-slate-500">
                        {" "}
                        tone
                      </span>
                    </h4>
                    <h4
                      id="standardCoalSavingsByYear"
                      class="align-text-bottom text-[2vmax] leading-none"
                    >
                      {standardCoalSavingsByYear().toFixed(1)}
                      <span class="text-[1vmax] font-medium text-slate-500">
                        {" "}
                        tone/an
                      </span>
                    </h4>
                  </Show>
                </div>
              </div>
            </div>
          </div>
          {/* Big card */}
          <div class="flex grow h-full flex-col items-start justify-between rounded-[1.5vmax] border-[0.1vmax] border-slate-300/50 bg-slate-100 p-[0.5vmax]">
            {/* Chart */}
            <div class="relative mb-[0.35vmax] max-md:flex-wrap h-full flex w-full flex-grow flex-col items-center justify-center rounded-[1.25vmax] border-[0.1vmax] border-slate-200/50 bg-slate-50">
              <h4 class="-ml-[2vmax] mb-[0.25vmax] text-[2.35vmax] font-medium text-slate-500 top-[1.25vmax]">
                Putere generată în timp real
              </h4>
              <div class="flex items-end">
                <Show when={parsedData()}>
                  <h4
                    id="realTimePower"
                    class="align-text-bottom text-[10vmax] leading-none font-medium"
                  >
                    {realTimePower().toFixed(1)}
                    <span class="text-[2.25vmax] font-medium text-slate-500">
                      kW
                    </span>
                  </h4>
                </Show>
                <div class="h-full grow flex flex-col text-slate-400"></div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </main>
  );
}
