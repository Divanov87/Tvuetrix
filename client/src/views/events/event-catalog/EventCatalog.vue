<script setup>
import EventPagination from '../../../components/EventPagination.vue';
import Loader from '../../../components/Loader.vue';
import { useEvents } from '../../../composables/useEvents';
import { usePagination } from '../../../composables/usePagination';
import { usePaginationQuery } from '../../../composables/usePaginationQuery';
import { getAllEvents } from '../../../dataProvider/event';
import EventCard from '../components/event-card/EventCard.vue';

const { events, isLoading } = useEvents(getAllEvents);
const eventsPerPage = 8;
const initialPage = usePaginationQuery(1);

const { currentPage, totalPages, currentEvents, handlePageChange } = usePagination(
  events,
  eventsPerPage,
  initialPage,
);
</script>

<template>
  <article>
    <section class="top-rated">
      <div class="container">
        <p class="section-subtitle">
          Latest
        </p>
        <h2 class="h2 section-title">
          Theater & Music <strong>Performances</strong>
        </h2>

        <Loader v-if="isLoading" />

        <template v-else>
          <ul class="movies-list">
            <EventCard
              v-for="event in currentEvents"
              :key="event._id"
              v-bind="event"
            />
            <h2 v-if="currentEvents.length === 0" class="h2 section-title">
              No events found!
            </h2>
          </ul>
          <EventPagination
            :total-pages="totalPages"
            :current-page="currentPage"
            @page-change="handlePageChange"
          />
        </template>
      </div>
    </section>
  </article>
</template>

<style scoped>
li {
    list-style-type: none;
}
.top-rated{
    background:url(/assets/images/bg-fixed-overlay.jpg) no-repeat;
    background-size:cover;
    background-position:center;
    padding-block:var(--section-padding);
    background-attachment:fixed
}
.top-rated .section-title{
    margin-bottom:50px
}
.h2{
    font-size:var(--fs-2)
}
.section-subtitle{
    color:var(app-);
    font-size:var(--fs-11);
    font-weight:var(--fw-500);
    text-transform:uppercase;
    letter-spacing:1px;
    margin-bottom:10px;
    text-align:center;
    padding-top:50px
}
.section-title{
    text-align:center
}
.movies-list{
    display:grid;
    gap:50px
}
@media (min-width:550px){
    :root{
        --fs-1:42px
    }
    .container{
        max-width:540px;
        margin-inline:auto
    }
    .movies-list{
        grid-template-columns:1fr 1fr;
        gap:60px 30px
    }
}
@media (min-width:768px){
    :root{
        --fs-2:36px
    }
    .container{
        max-width:720px
    }
}
@media (min-width:992px){
    .movies-list{
        grid-template-columns:repeat(3,1fr)
    }
}
@media (min-width:1200px){
    :root{
        --fs-1:60px;
        --fs-4:26px
    }
    .container{
        max-width:1320px
    }
    .movies-list{
        grid-template-columns:repeat(4,1fr)
    }
}
.filter-container{
    padding-top:20px;
    padding-bottom:50px;
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    gap:10px
}
.filter-container select{
    flex:2
}
.filter-container select{
    flex:30%;
    margin-right:0;
    color:var(--white);
    font-size:var(--fs-11);
    font-weight:var(--fw-600);
    border:2px solid var(--gunmetal-1);
    padding:12px 15px;
    border-radius:50px
}
.filter-container select{
    background:var(--raisin-black);
    color:#fff
}
.filter-container option{
    background-color:rgba(255,255,255,.947)
}
.vertical{
    display:flex;
    align-items:center;
    border-left:2px solid #fff;
    padding-left:8px
}
.btn{
    color:var(--white);
    font-size:var(--fs-11);
    text-transform:uppercase;
    letter-spacing:2px;
    display:flex;
    align-items:center;
    gap:10px;
    padding:16px 30px;
    border:2px solid var(--light-gray);
    border-radius:50px;
    transition:var(--transition-1)
}
#search-input{
    color:var(--white);
    font-size:var(--fs-8);
    padding:4px;
    border-radius:4px;
    margin-right:10px;
    background-color:transparent;
    outline:0
}
.search-btn{
    position:relative;
    color:var(--white);
    cursor:pointer;
    font-size:20px
}
.search-btn::after{
    content:"";
    position:absolute;
    top:1px;
    right:20px;
    background-color:transparent;
    width:2px;
    height:14px
}
.vertical{
    display:flex;
    align-items:center;
    border-left:2px solid #fff;
    padding-left:8px
}
.src{
    color:var(--white);
    letter-spacing:2px;
    display:flex;
    align-items:center;
    gap:10px;
    padding:16px 30px;
    border:2px solid var(--light-gray);
    border-radius:50px;
    transition:var(--transition-1)
}
select{
    color:var(--rich-black-fogra-29)
}
select option{
    color:var(--rich-black-fogra-29)
}
.bx-search{
    font-size:22px
}
</style>
